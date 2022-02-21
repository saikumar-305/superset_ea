import base64
import datetime
import logging
import json
import requests

from flask import redirect, g, flash, request, make_response,abort,Response,session,jsonify
from flask_appbuilder.security.forms import LoginForm_db
from flask_appbuilder.security.sqla.models import User
from flask_appbuilder.security.views import UserDBModelView,AuthDBView
from superset.security import SupersetSecurityManager
from flask_appbuilder.security.views import expose
from flask_appbuilder.security.manager import BaseSecurityManager
from flask_login import login_user, logout_user
from superset import security_manager

logger = logging.getLogger(__name__)

class CustomAuthDBView(AuthDBView):
    login_template = 'appbuilder/general/security/login_db.html'

    @expose('/login/', methods=['GET', 'POST'])
    def login(self):
        form  = LoginForm_db()

        login_response = self.login_api_call()

        if(request.method == "GET"):

            # user = security_manager.find_user(username=form.data['username'])
            # if(user):
            #     login_user(user,remember = False)
            # else:
            #     return "User Not Found"
            if login_response['jwt']:
                res = redirect('/superset/segmentation')
            else:
                res = "Invalid Credentials"
            return res
        else:
            return login_response
    def login_api_call(self) -> Response:
        url = "https://oysterapi.expressanalytics.net/api/gw/oauth/token"
 
        headers = {"Content-Type": "application/json"}
 
        data = {
        "password": "@Coditation@1234",
        "rememberMe": False,
        "username": "saurabh@expressanalytics.net"
        }

        req_data = base64.urlsafe_b64encode(json.dumps(data).encode()).decode()
    
        response_data = requests.post(url = url , headers = headers , data =req_data)
        return response_data.json()
        
    

class CustomSecurityManager(SupersetSecurityManager):
    authdbview = CustomAuthDBView
    def __init__(self, appbuilder):
        super(CustomSecurityManager, self).__init__(appbuilder)