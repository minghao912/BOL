from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import Source
from .serializers import SourceSerializer

def test(request):
    return HttpResponse('Test suceeded')

def sources(request):
    return HttpResponse('Under Construction')

@csrf_exempt
@api_view(['GET'])
def getSource(request, id):
    source = Source.objects.get(id=id)
    serializer = SourceSerializer(source)
    return JsonResponse(serializer.data)

@csrf_exempt
@api_view(['GET'])
def getAll(request):
    sources = Source.objects.all()
    serializer = SourceSerializer(sources, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def createSource(request):
    serializer = SourceSerializer(data=request.data)

    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)

    source = serializer.save()
    return JsonResponse({
        "id": source.id
    })

@api_view(['PUT'])
def updateSource(request, id):
    source = Source.objects.get(id=id)
    serializer = SourceSerializer(source, data=request.data)

    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)
    
    modified = serializer.save()
    return JsonResponse(serializer.data)

@api_view(['DELETE'])
def deleteSource(request, id):
    source = Source.objects.get(id=id)
    deletedID = source.id
    source.delete()
    return JsonResponse({
        "id": deletedID
    })