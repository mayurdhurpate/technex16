from django.contrib import admin

from hello.models import User, ParentEvent, Event, Team, Post,Points,Event_Options,TeamMember

class EventOptionsInline(admin.TabularInline):
    model = Event_Options


class EventAdmin(admin.ModelAdmin):
    inlines = [EventOptionsInline,
    ]
    list_display=('name',)

admin.site.register(User)
admin.site.register(Post)
admin.site.register(ParentEvent)
admin.site.register(Event,EventAdmin)
admin.site.register(Team)
admin.site.register(Points)
admin.site.register(TeamMember)
admin.site.register(Event_Options)
