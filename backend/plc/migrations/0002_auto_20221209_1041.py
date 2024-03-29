# Generated by Django 3.2 on 2022-12-09 09:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plc', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Controller',
            new_name='PLC',
        ),
        migrations.RenameField(
            model_name='input',
            old_name='date',
            new_name='block_date',
        ),
        migrations.RenameField(
            model_name='tag',
            old_name='controller',
            new_name='plc',
        ),
        migrations.RemoveField(
            model_name='tag',
            name='address_start_bit',
        ),
        migrations.RemoveField(
            model_name='tag',
            name='address_start_byte',
        ),
        migrations.AddField(
            model_name='tag',
            name='ad_start',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tag',
            name='address_bit',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tag',
            name='data_type',
            field=models.CharField(choices=[('int', 'int'), ('bool', 'bool')], max_length=4),
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=255),
        ),
        migrations.CreateModel(
            name='InputTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value_tag', models.BinaryField()),
                ('input', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plc.input')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plc.tag')),
            ],
        ),
        migrations.AddField(
            model_name='input',
            name='tags',
            field=models.ManyToManyField(through='plc.InputTag', to='plc.Tag'),
        ),
    ]
