Feature: Editar datos basicos de un partido
    Como usuario
    Quiero editar los datos basicos
    Para actualizar un partido
    
    Scenario: Edicion correcta de un partido
        Given un partido ya creado con fecha '2020-12-01'
        When edito la fecha del partido por '2020-12-31'
        Then la fecha del partido esta actualizada al '2020-12-31'
        