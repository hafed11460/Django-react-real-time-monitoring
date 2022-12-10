# Generated by Django 3.2 on 2022-12-09 08:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Controller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('ip_v4', models.GenericIPAddressField(unique=True)),
                ('rack', models.IntegerField(verbose_name='rack')),
                ('slot', models.IntegerField(verbose_name='slot')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Input',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('date', models.BinaryField(verbose_name='data')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='time')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('data_type', models.CharField(max_length=50, verbose_name='data type')),
                ('address_start_byte', models.IntegerField(verbose_name='')),
                ('address_start_bit', models.IntegerField(verbose_name='')),
                ('controller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='plc.controller')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
