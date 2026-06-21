from django.urls import path
from .views import *

urlpatterns = [
    path("jobs/", JobListView.as_view()),
    path('jobs/<int:pk>/save/', save_job),
    path("saved-jobs/", SavedJobsView.as_view()),
    path("jobs/<int:pk>/", JobDetailView.as_view()),
    path("dashboard-stats/", dashboard_stats),
]