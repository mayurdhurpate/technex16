from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import hello.views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'gettingstarted.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', hello.views.index, name='index'),
    url(r'^db', hello.views.db, name='db'),
    url(r'^signup/$', hello.views.signup, name='signup'),
    url(r'^display', hello.views.display, name='display'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^signup_email/$',hello.views.signup_email,name='signup_email'),
    url(r'^login_email/$',hello.views.login_email,name='login_email'),
    url(r'^login/$',hello.views.login,name='login'),
)
