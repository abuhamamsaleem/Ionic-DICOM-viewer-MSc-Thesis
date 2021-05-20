# Ionic DICOM VIEWER @inclouded

![](./uszeged.png)

## Global environment
The application was development under Ubuntu 20.04 using the following:
* IonicCLI@6.13.1
* AngularCLI@11.1.4
* NPM@6.14.12
* Google Cloud Platform
* Apache Airflow@2.0.1
* Orthanc DICOM Server@1.9.3

## installation guide:
* communicate with the responsible part at the University of Szeged to access the DICOM server 
or you can install one yourself from: https://www.orthanc-server.com/  
  to start the web server  
  `sudo service orthanc start`
  

* install Apache Airflow from  
  https://airflow.apache.org/docs/apache-airflow/stable/start/local.html
  
  `airflow webserver -p 8080 `

  another possibility is to run Airflow in a Docker container, it is needed to configure a local database, e.g mysql


* install @ionic/cli@latest

  `npm install -g @ionic/cli`


* install @angular/cli@latest
  
  `npm install -g @angular/cli`

### Nginx
To overcome the CORS problem while communicating with PACS, I have chosen to run both my application server (ionic server) and PACS behind Nginx reverse proxy server.
Another approach would be using google cloud functions with a VPN (Zero Tier).

* start by installing nginx

  `sudo apt install nginx`

* Adjust the firewall
  
  `sudo ufw app list`
  
  `sudo ufw allow 'Nginx HTTP'`
* navigate to the default nginx dir `/etc/nginx/sites-available`

  add the following to the `reverse-proxy.conf`
  ```
  server {
    listen  8082  default_server;
    location  /orthanc/  {
    proxy_pass http://127.0.0.1:8042;
    proxy_set_header HOST $host;
    proxy_set_header X-Real-IP $remote_addr;
    rewrite /orthanc(.*) $1 break;

      add_header 'Access-Control-Allow-Credentials' 'true' always;
      add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-T>
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
      add_header 'Access-Control-Allow-Origin' '*' always;
  }

  location / {
    proxy_pass http://localhost:4200;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
    }
  }
  ```
### test your orthanc server and nginx, then navigate to the frontend dir, hit npm install then ng serve.

### **the backend dir is a skeleton for further development using maven.
