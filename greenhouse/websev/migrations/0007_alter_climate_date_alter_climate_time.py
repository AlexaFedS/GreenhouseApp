# Generated by Django 4.2.13 on 2024-05-12 16:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websev', '0006_alter_climate_date_alter_climate_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='climate',
            name='date',
            field=models.CharField(default='12.05.2024', max_length=10),
        ),
        migrations.AlterField(
            model_name='climate',
            name='time',
            field=models.TimeField(default=datetime.time(19, 18, 0, 694698)),
        ),
    ]
