Feature: Crear un partido
    Como usuario
    Quiero crear un partido
    Para especificar los datos básicos

    Scenario: Creacion correcta de un partido
        Given un usuario crea un partido con fecha '2020-06-16' hora '19:00:00' y lugar 'Libertadores de América'
        When guarda la información
        Then el partido queda definido con fecha '2020-06-16' hora '19:00:00' y lugar 'Libertadores de América'

    Scenario: Creacion de un partido con fecha invalida
        Given un usuario crea un partido con fecha '1986-06-16' hora '19:00:00' y lugar 'Libertadores de América'
        When guarda la información
        Then el partido no se crea