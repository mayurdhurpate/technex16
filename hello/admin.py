from django.contrib import admin
from hello.models import User,Event,Parent_Event,Post,Team
admin.site.register(User)
admin.site.register(Post)
admin.site.register(Team)
admin.site.register(Parent_Event)
admin.site.register(Event)

# Register your models here.
