# Generated by Django 3.2 on 2022-12-18 12:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plc', '0005_auto_20221218_1325'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='input',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='input',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='tag',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='tag',
            name='updated_at',
        ),
    ]
