from django.shortcuts import render
from rest_framework import generics
from .models import Job
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import JobSerializer
from django.db.models import Q

class JobListView(generics.ListCreateAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        queryset = Job.objects.all().order_by("-created_at")

        query = self.request.GET.get("q")
        source = self.request.GET.get("source")

        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) |
                Q(company__icontains=query) |
                Q(location__icontains=query)
            )

        if source:
            queryset = queryset.filter(
                source__icontains=source
            )

        return queryset
    
class SavedJobsView(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(is_saved=True)

class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
@api_view(['POST'])
def save_job(request, pk):
    job = Job.objects.get(id=pk)
    job.is_saved = True
    job.save()

    return Response({
        "message": "Job Saved"
    })

@api_view(["GET"])
def dashboard_stats(request):

    total_jobs = Job.objects.count()

    saved_jobs = Job.objects.filter(
        is_saved=True
    ).count()

    applied_jobs = Job.objects.filter(
        is_applied=True
    ).count()

    return Response({
        "total_jobs": total_jobs,
        "saved_jobs": saved_jobs,
        "applied_jobs": applied_jobs
    })
