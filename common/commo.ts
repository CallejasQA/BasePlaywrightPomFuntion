export class Common {

    //Logica que genera un ramdon de nombre, masculinos, femeninos, apellidos y nombre completo masculino
        GenararNombres(aleatorio: string) {
            let nombresF: string[] = ['Ana', 'María', 'Sofía'];
            let nombresM: string[] = ['Juan', 'Pedro', 'Carlos'];
            let apellidos: string[] = ['Gómez', 'Pérez', 'López'];
            if (aleatorio === 'F') {
                var aleatorio = nombresF[Math.floor(Math.random() * nombresF.length)];
                return aleatorio;
            } else if (aleatorio === 'M') {
                var aleatorio = nombresM[Math.floor(Math.random() * nombresM.length)];
                return aleatorio;
            } else if (aleatorio === 'AP') {
                var aleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
                return aleatorio;
            } else if (aleatorio === 'NC') {
                var nombreCompleto = nombresF[Math.floor(Math.random() * nombresF.length)] + ' ' + nombresF[Math.floor(Math.random() * nombresF.length)] + ' ' + apellidos[Math.floor(Math.random() * apellidos.length)] + ' ' + apellidos[Math.floor(Math.random() * apellidos.length)]
                return nombreCompleto;
            } else {
                return 'Param_No_valido';
            }
    
        }
    
        RandomCelular(): string {
            // Lógica para generar un número de teléfono aleatorio, que inicie entre un rango de 300 a 350 y adicionar un número ramdon de 7 digitos que completa los 10
            const rangoInicial = 300;
            const rangoFinal = 350;
            const tresPrimerosDigitos = String(rangoInicial + Math.floor(Math.random() * (rangoFinal - rangoInicial + 1)));
            const numeroCelular = `${tresPrimerosDigitos}${Math.floor(1000000 + Math.random() * 9000000)}`; 
            return numeroCelular;
        }
    
    }