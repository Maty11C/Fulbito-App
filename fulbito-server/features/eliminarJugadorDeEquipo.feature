Feature: Eliminar participante de un partido

    Como usuario
    Quiero eliminar a un participante de un partido
    Para que no participe del encuentro

    Scenario: Eliminar correctamente a un usuario de un equipo
    Given un equipo con usuarios participantes
    When selecciono un usuario para eliminarlo del equipo del partido
    Then el usuario ya no forma parte del equipo

    Scenario: Eliminar usuario que no es participante de un equipo
    Given un equipo en el que no participa el usuario
    When selecciono un usuario para eliminarlo del equipo del partido
    Then no puedo eliminarlo debido a que no pertenece al equipo