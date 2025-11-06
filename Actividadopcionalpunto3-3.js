const fs = require('fs');
const rutaarchivo = './data.json';

class Manager {
    constructor(rutaarchivo) {
        this.ruta = rutaarchivo;
        this.users = [];

    }

    async init() {
        try {
            //Existen usuarios ya creados?, y un archivo ya creado para almacenarlos?
            const data = fs.readFileSync(this.ruta, 'utf-8');
            this.users = data ? JSON.parse(data) : [];
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                //Si no existe, crea el archivo
                await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
                this.users = [];
            } else {
                console.error('Error al leer el archivo.', error);
            };
        };
    };

    //Agregar usuario parametros(1: nombre, 2: contraseña)
    async addUser(userid, username, userpsw) {
        let user = {
            userid,
            username,
            userpsw
        };

        //Verificar si existe el ID
        const existenciadelid = this.users.find((e) => e.userid === userid);
        if (existenciadelid) {
            console.error('Id existente. Cambiarlo.');
            return
        };

        //Completar todos los campos y agregarlo al archivo
        if (userid && username && userpsw) {
            this.users.push(user);
            await fs.writeFileSync(this.ruta, JSON.stringify(this.users, null, 2));
            return console.log('Usuario agregado', username)
        }
        else {
            console.error('Intenta nuevamente colocando otro nombre y contraseña.');
        };

    };

    //Recuperar y mostrar usuarios por consola
    async getUsers() {
        console.log(this.users);
    };

    //Eliminar un usuario por su id
    async deleteUsers(userid) {
        //Existe el id?
        const useridexiste = this.users.find((e) => e.userid === userid);
        if (!useridexiste) {
            return console.error('Usuario no existente.');
        }

        //Array nuevo sin el id, reescrito en el archivo
        this.users = this.users.filter((e) => e.userid !== userid);
        await fs.writeFileSync(this.ruta, JSON.stringify(this.users, null, 3));
        return console.log(`Usuario de id ${userid}, eliminado.`);
    };

};

const manager = new Manager(rutaarchivo);
//Auto ejecucion(Se ejecuta una vez escrita, no requiere llamado.)
(async () => {
    //Inicializado antes de utilizar métodos asincronicos
    await manager.init();
    //Métodos
    await manager.addUser(1, 'tomas', '12345');
    await manager.getUsers();
})();