Este es el servidor de ballet

debe devolver estado y respuesta

peticiones: => 
        RESPUESTA 1:
        {
          info: {
            count: n, 
            pages: n,
            next: "link?page=2"
            prev: null
          },
          results: [
            {},
            {}
          ]
        }

        RESPUESTA 2:
        {
          INFORMACION
        }

CREATE:
  PASO 1: ENVIAR JSON
  PASO 2: VERIFICAR QUE TODO ESTE EN ORDEN Y NO HAYA REPETIDOS
  PASO 3: GUARGAR
  PASO 4: MOSTRAR TODOS LOS REGISTROS ACTUALIZADOS, RESPUESTA 1

GET:
  PASO 1: MOSTRAR TODOS LOS REGISTROS CON EL SIGUIENTE FORMATO: RESPUESTA 1

GET ID:
  PASO 1: RECIVIR EL PARAMETRO POR PARAMS
  PASO 2: VERIFICAR DEBE SER NUMERO
  PASO 3: BUSCAR Y DEVOLVER LA RESPUESTA 2

UPDATE
  PASO 1: VERIFICAR QUE TODO ESTE EN ORDEN
  PASO 2: ACTUALIZAR
  PASO 3: DEVOLVER LA RESPUESTA 2

DELETE
  PASO 1: RECIVIR EL PARAMETRO POR PARAMS
  PASO 2: VERIFICAR DEBE SER NUMERO
  PASO 3: DEVOLVER TODOS LOS DATOS CON LA RESPUESTA 1

STATUS                  200 400


[{1},{2},{3},{4},{5},{6},{7},{8},{9},{10}] 
*largo 10 elementos
*quiero por pagina 2                       5 = 10 / 2
                          [0] [1]
PAGINA N° 1 ==> results: [{1},{2}]  
                          [2] [3]
PAGINA N° 2 ==> results: [{3},{4}]
                          [4] [5]
PAGINA N° 3 ==> results: [{5},{6}]
                          [6] [7]
PAGINA N° 4 ==> results: [{7},{8}]
                          [8] [9]
PAGINA N° 5 ==> results: [{9},{10}]

*quiero por pagina 3
                           [0] [1] [2]
PAGINA N° 1 ==>  results: [{1},{2},{3}]
                           [3] [4] [5]
PAGINA N° 2 ==>  results: [{4},{5},{6}]
                           [6] [7] [8]
PAGINA N° 3 ==>  results: [{7},{8},{9}]
                           [9] 
PAGINA N° 4 ==>  results: [{10}]

*quiero por pagina 8
                           [0] [1] [2] [3]
PAGINA N° 1 ==>  results: [{1},{2},{3},{4}]
                           [4] [5] [6] [7]
PAGINA N° 2 ==>  results: [{5},{6},{7},{8}]
                           [8] [9]
PAGINA N° 3 ==>  results: [{9},{10}]