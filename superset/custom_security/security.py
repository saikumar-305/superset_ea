import base64
import datetime
import logging
import json
import requests

from flask import redirect, g, flash, request, make_response,abort,Response,session,jsonify,render_template,url_for
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
    login_template = 'superset/login_db.html'
    @expose('/login/', methods=['GET', 'POST'])
    def login(self):
        form  = LoginForm_db()
    
        if (request.method == 'GET'):
            return render_template(self.login_template, form=form,login=True)

        else:
            login_response = self.login_api_call(form.data['username'], form.data['password'])
            user = security_manager.find_user(email=form.data['username'])
            login_user(user, remember=False)
            if login_response.status_code == 200:
                res = redirect('/superset/welcome/')
                res.set_cookie('accessToken',login_response.json()['jwt'])
                res.set_cookie('refreshToken',login_response.json()['refreshToken'])
            else:
                res = render_template(self.login_template, form=form)
            return res   

    def login_api_call(self, username , password) -> Response:
        url = "https://oysterapi.expressanalytics.net/api/gw/oauth/token"
 
        headers = {"Content-Type": "application/json"}
 
        data = {
        "password": password,
        "rememberMe": False,
        "username": username
        }

        req_data = base64.urlsafe_b64encode(json.dumps(data).encode()).decode()
        print(req_data)
    
        response_data = requests.post(url = url , headers = headers , data =req_data)
        return response_data
        
    

class CustomSecurityManager(SupersetSecurityManager):
    authdbview = CustomAuthDBView
    def __init__(self, appbuilder):
        super(CustomSecurityManager, self).__init__(appbuilder)