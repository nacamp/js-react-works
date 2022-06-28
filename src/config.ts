let _host:string = 'http://localhost:3000'

function setHost(host:string){
  _host = host;
}

function getHost(){
  return _host;
}

export { setHost, getHost }