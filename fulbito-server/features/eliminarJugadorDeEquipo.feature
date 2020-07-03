Feature: Eliminar participante de un partido

    Como usuario
    Quiero eliminar a un participante de un partido
    Para que no participe del encuentro

    Scenario: Quitar correctamente a un usuario de un equipo
    Given un equipo con usuarios participantes
    When selecciono un usuario para eliminarlo del equipo del partido
    Then el usuario ya no forma parte del equipo

    Scenario: Usuario eliminado puede volver a agregarse
    Given un equipo con usuarios participantes
    When selecciono un usuario para eliminarlo del equipo del partido
    Then el usuario aparece entre el listado de usuarios disponibles

    Scenario: Usuario a eliminar no esta en el equipo
    Given un equipo con usuarios participantes
    When selecciono un usuario que no pertence al equipo para eliminarlo
    Then no puedo eliminar un usuario que no pertenece al equipo