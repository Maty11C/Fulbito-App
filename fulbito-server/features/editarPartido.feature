Feature: Editar datos basicos de un partido
    Como usuario
    Quiero editar los datos basicos
    Para actualizar un partido
    
    Scenario: Edicion correcta de un partido
        Given un partido ya creado con fecha 1/12/2020
        When edito la fecha del partido por 31/12/2020
        Then la fecha del partido esta actualizada al 31/12/2020
        