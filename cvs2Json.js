/*
    Convertidor de CVS a Json
    
    @Uso: Node cvstoJson nombre-del-cvs
    
    Crea el archivo json en el mismo directorio del cvs
*/
const http = require('http')
const fs = require('fs')
const path = require('path')
//const uuidv1 = require('uuid/v1')

const nbCompleto = nbArch => {
    // Si no tiene referencia a Directorio, se usa el directorio del js
    let retorno = (nbArch.indexOf("\\") === nbArch.indexOf("/"))  ? path.join(__dirname, nbArch) : nbArch;
    if (retorno.slice(-4).toLowerCase != ".csv") retorno += ".csv";
    return retorno
}

const conv = require('csvtojson')

const convierte = (nbCSV) => {
    nbCSV = nbCompleto(nbCSV);
    console.log ('Accede ', nbCSV)

    const escribe = (nbCSV,json) => {
        let nbJson = nbCSV.replace(".csv", ".json");
        console.log("Escribe ", json.length, " registros.", " en ", nbJson);
        
    console.log(fs.writeFileSync(nbJson,JSON.stringify(json)), " bites escritos.");
        console.log(nbCSV, ' convertido a ', nbJson);
    }

    let json = [];

    conv()
        .fromFile(nbCSV)
        .on('json',(jsonObj)=>{
            json.push(jsonObj)
        })
        .on('done',(error)=>{
            if (error) console.log( error)
            else {
                escribe(nbCSV,json);
                console.log('Conversión Finalizada')
            }
        })
}

convierte(process.argv[2])

/*
Submission Instructions
To submit the assignment for feedback, put all the program files into GitHub and post a link to your code repository in the Assignment 1 Submissions section of the forums.

In addition to providing the GitHub link, please also answer the following questions about your project:

1. Walk us through the design of your project. Why did you design your project the way you did? What difficulties did you overcome?

2. How did you test your project to verify that it works? 

3. Let us know if anything doesn't work as intended so your reviewer will know ahead of time

A link to the forums submissions section is provided below:
*/