from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):

    def create_user(self , email , first_name, last_name, password=None):
        if not email:
            raise ValueError(_("Users must have an email address."))
        if not first_name:
            raise ValueError(_("Users must have an first_name."))
        if not last_name:
            raise ValueError(_("Users must have an last_name."))

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self , email , first_name,last_name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def get_profile_image_filepath(self, filename):
    return f'profile_images/{self.pk}/{"profile_image.png"}'

def get_default_profile_image():
    return "profile_images/default.png"

class Role(models.Model):
    name = models.CharField(_("role"), max_length=50)

    def __str__(self):
        return self.name


class User(AbstractBaseUser):
    ROLES_CHOICES = (
      (1, 'Administrator'),
      (2, 'Manager'),
      (5, 'User'),
    )

    role = models.PositiveSmallIntegerField(null=True, blank=True, choices=ROLES_CHOICES)
    email = models.EmailField(_("email"), max_length=254 , unique=True)
    first_name  = models.CharField(_("first name"), max_length=50)
    last_name  = models.CharField(_("last name"), max_length=50)

    date_joined = models.DateTimeField(_("date joined"), auto_now=False, auto_now_add=True)
    last_login = models.DateTimeField(_("last login"), auto_now=True)
    is_admin = models.BooleanField(_("is admin"), default=False)
    is_active = models.BooleanField(_("is active"), default=True)
    is_staff = models.BooleanField(_("is staff"), default=False)
    is_superuser = models.BooleanField(_("is superuser"), default=False)
    profile_image = models.ImageField(_("image"), upload_to=get_profile_image_filepath,
                                     max_length=255 , default=get_default_profile_image)
    updated_at = models.DateTimeField(_("date update"),auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name' ]

    def __str__(self):
        return self.first_name

    def get_profile_image_filename(self):
        return str(self.profile_image)[str(self.profile_image).index(f'profile_images/{self.pk}/'):]

    def has_perm(self , perm , obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def is_manager(self):
        return (self.role.id == 1)

    def full_name(self):
        return f'{self.first_name} {self.last_name}'


# class UserProfileImage(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     image = models.ImageField(_('Image') , default=get_default_profile_image, upload_to=get_profile_image_filepath)

#     def __str__(self):
#         return self.user.full_name()
