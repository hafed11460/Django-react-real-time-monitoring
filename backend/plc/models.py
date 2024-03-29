from django.db import models
from django.utils.translation import gettext_lazy as _


class WithTimestamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # deleted_at = models.DateTimeField(blank=True,null=True, default=None)

    class Meta:
        abstract = True


class PLC(WithTimestamp,models.Model):
    ip_v4 = models.GenericIPAddressField(unique=True)
    rack = models.IntegerField(_("rack"))
    slot = models.IntegerField(_("slot"))

    def __str__(self):
        return self.ip_v4


class Tag(models.Model):
    DATA_TYPE = [
        ('int', 'int'),
        ('bool', 'bool'),
        ('float', 'float'),
    ]
    plc = models.ForeignKey(PLC,related_name='tags', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    data_type = models.CharField(choices=DATA_TYPE,max_length=5)
    address_start_byte = models.IntegerField()
    address_start_bit = models.IntegerField()

    def __str__(self):
        return self.name


class Input(models.Model):
    data_input = models.BinaryField()
    time = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, through='InputTag')

    def __str__(self):
        return str(self.time)

    def add_tag(self,tag):
        self.tags.add(tag)
        self.save()

class InputTag(models.Model):
    input = models.ForeignKey(Input, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    value_tag = models.BinaryField()