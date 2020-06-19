Feature: Editar datos basicos de un partido
    Como usuario
    Quiero editar los datos basicos
    Para actualizar un partido
    
    Scenario: Edicion de fecha de un partido
        Given un partido ya creado con fecha '2020-12-01'
        When edito la fecha del partido por '2020-12-31'
        Then la fecha del partido esta actualizada al '2020-12-31'
    
    Scenario: Edicion de hora de un partido
        Given un partido ya creado con hora '12:00:00'
        When edito la hora del partido por '19:00:00'
        Then la hora del partido está actualizada a '19:00:00'
    
    Scenario: Edicion de lugar de un partido
        Given un partido ya creado con ubicación 'Club América'
        When edito la ubicación del partido por 'Club Esperanza'
        Then la ubicación del partido está actualizada a 'Club Esperanza'
    
    Scenario: Edicion de fecha antigua de un partido
        Given un partido ya creado con fecha '2020-12-01'
        When edito la fecha del partido por '1986-12-31'
        Then el partido no se edita por fecha inválida

    Scenario: Edicion sin campo ingresado de un partido
        Given un partido ya creado con fecha '2020-12-01'
        When edito el partido y no ingreso un campo
        Then el partido no se edita por falta de campos