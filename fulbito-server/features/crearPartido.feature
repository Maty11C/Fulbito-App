Feature: Crear un partido
    Como usuario
    Quiero crear un partido
    Para especificar los datos básicos

    Scenario: Creacion correcta de un partido
        Given un usuario crea un partido con fecha '2021-06-16' hora '19:00:00' y lugar 'Libertadores de América'
        When guarda la información
        Then el partido queda definido con fecha '2021-06-16' hora '19:00:00' y lugar 'Libertadores de América'

    Scenario: Creacion de un partido con fecha invalida
        Given un usuario crea un partido con fecha '1986-06-16' hora '19:00:00' y lugar 'Libertadores de América'
        When guarda la información
        Then el partido no se crea por fecha inválida

    Scenario: Creacion de un partido sin fecha
        Given un usuario crea un partido con hora '19:00:00' y lugar 'Libertadores de América'
        When guarda la información
        Then el partido no se crea
    
    Scenario: Creacion de un partido sin hora
        Given un usuario crea un partido con fecha '2021-06-16' y lugar 'Libertadores de América'
        When guarda la información
        Then el partido no se crea
    
    Scenario: Creacion de un partido sin lugar
        Given un usuario crea un partido con fecha '2021-06-16' y hora '19:00:00'
        When guarda la información
        Then el partido no se crea