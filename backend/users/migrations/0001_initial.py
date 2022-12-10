# Generated by Django 3.2 on 2022-12-08 20:40

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='role')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('role', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Administrator'), (2, 'Manager'), (5, 'User')], null=True)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email')),
                ('first_name', models.CharField(max_length=50, verbose_name='first name')),
                ('last_name', models.CharField(max_length=50, verbose_name='last name')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False, verbose_name='is admin')),
                ('is_active', models.BooleanField(default=True, verbose_name='is active')),
                ('is_staff', models.BooleanField(default=False, verbose_name='is staff')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='is superuser')),
                ('profile_image', models.ImageField(default=users.models.get_default_profile_image, max_length=255, upload_to=users.models.get_profile_image_filepath, verbose_name='image')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='date update')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]