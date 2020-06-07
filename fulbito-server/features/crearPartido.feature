Feature: Crear un partido
    Como usuario
    Quiero crear un partido
    Para especificar los datos básicos

    Scenario: Creacion correcta de un partido
        Given un usuario crea un partido con fecha '20/06/2020' hora '19:00' y lugar 'Club América'
        When guarda la información
        Then el partido queda definido con fecha '20/06/2020' hora '19:00' y lugar 'Club América'
