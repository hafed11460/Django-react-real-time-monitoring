# Generated by Django 3.2 on 2022-12-09 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plc', '0003_auto_20221209_1046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='input',
            name='block_data',
            field=models.BinaryField(),
        ),
        migrations.AlterField(
            model_name='input',
            name='time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
