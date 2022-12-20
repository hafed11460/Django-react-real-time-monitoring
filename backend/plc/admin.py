from django.contrib import admin
from plc.models import PLC, Tag, Input, InputTag
# Register your models here.


class PLCAdmin(admin.ModelAdmin):
    list_display = ['id', 'ip_v4', 'rack','slot']

class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'plc', 'name','data_type','address_start_byte','address_start_bit']

class InputAdmin(admin.ModelAdmin):
    list_display = ['id', 'data_input', 'time']

class InputTagAdmin(admin.ModelAdmin):
    list_display = ['id', 'input', 'tag','value_tag']


admin.site.register(PLC, PLCAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Input, InputAdmin)
admin.site.register(InputTag, InputTagAdmin)