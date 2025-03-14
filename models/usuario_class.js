class Usuario {
  constructor(
    nombre,
    primerApellido,
    segundoApellido,
    fechaDeNacimiento,
    correo,
    password
  ) {
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.fechaDeNacimiento = fechaDeNacimiento;
    this.estaActivo = true;
    this.fechaDeRegistro = new Date();
    this.correo = correo;
    this.password = password;
  }

  get getEncodedKey() {
    return this.encodedKey;
  }
  get getId() {
    return Number(this.id);
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

  get getEstaActivo() {
    return this.estaActivo;
  }

  get getFechaDeRegistro() {
    return this.fechaDeRegistro;
  }

  get getCorreo() {
    return this.correo;
  }

  get getPassword() {
    return this.password;
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
  set setEncodedKey(encodedKey) {
    this.encodedKey = encodedKey;
  }
  set setCorreo(correo) {
    this.correo = correo;
  }
  set setPassword(password) {
    this.password = password;
  }
}

module.exports = Usuario;
