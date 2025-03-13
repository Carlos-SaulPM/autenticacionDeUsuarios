class Usuario{
  constructor(nombre, primerApellido, segundoApellido, fechaDeNacimiento) {
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.fechaDeNacimiento = fechaDeNacimiento;
    //Se asigna nulo si es creacion de usuario nuevo
    this.estaActivo = true;
    this.fechaDeRegistro = new Date();
  }

  get getNombre() {
    return this.nombre;
  }

  get getPrimerApellido() {
    return this.primerApellido;
  }

  get getSegundoApellido() {
    return this.segundoApellido;
  }

  get getFechaDeNacimiento() {
    return this.fechaDeNacimiento;
  }

  get getEncodedKey() {
    return this.encodedKey;
  }

  get getEstaActivo() {
    return this.estaActivo;
  }

  get getFechaDeRegistro() {
    return this.fechaDeRegistro;
  }

  get getId() {
    return Number(this.id);
  }

  getOtros(stringPropiedad) {
    return this.otros[stringPropiedad];
  }

  get getOtros() {
    return this.otros;
  }

  set setId(id) {
    this.id = id;
  }
  
  
}

module.exports = Usuario;