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
