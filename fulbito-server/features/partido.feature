Feature: definir datos del partido
    In definir los datos de un partido
    como usuario
    quiero guardarlo en una entidad

    Scenario: definir fecha
        Given un partido sin fecha
        When le defino la fecha '20/06/2020'
        Then el partido tiene fecha '20/06/2020'

    Scenario: definir hora
        Given un partido sin hora
        When le defino la hora '19:00'
        Then el partido tiene hora '19:00'

    Scenario: definir lugar
        Given un partido sin lugar
        When le defino el lugar 'Club América'
        Then el partido tiene lugar 'Club América'