from django.apps import AppConfig

class PlcConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'plc'

    def ready(self):
        print('Start Schedule ... ')
        from plc.tag_scheduler import tag_generato
        tag_generato.start()