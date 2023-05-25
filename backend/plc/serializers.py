from rest_framework import serializers
from plc.models import PLC,Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id','name','data_type','address_start_byte','address_start_bit']


class ControllerSerializer(serializers.ModelSerializer):
    # tags = serializers.SlugRelatedField('name',)
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model=PLC
        fields = ['id','ip_v4','slot','rack','tags']