# Generated by Django 4.2.13 on 2024-05-08 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websev', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sensor',
            name='value',
        ),
        migrations.AddField(
            model_name='climate',
            name='value',
            field=models.IntegerField(default=0),
        ),
    ]