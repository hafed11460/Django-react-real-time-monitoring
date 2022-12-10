from django.contrib import admin
from plc.models import PLC, Tag, Input, InputTag
# Register your models here.


class PLCAdmin(admin.ModelAdmin):
    list_display = ['id', 'ip_v4', 'rack','slot','created_at']

class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'plc', 'name','data_type','ad_start','address_bit']

class InputAdmin(admin.ModelAdmin):
    list_display = ['id', 'block_data', 'time']

class InputTagAdmin(admin.ModelAdmin):
    list_display = ['id', 'input', 'tag','value_tag']


admin.site.register(PLC, PLCAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Input, InputAdmin)
admin.site.register(InputTag, InputTagAdmin)