Feature: Agregar jugador a equipo
    Como usuario
    Quiero agregar un participante a un equipo en un partido
    Para que participe del encuentro

    Scenario: Agregar correctamente un usuario a un equipo
        Given un usuario registrado en el sistema
        When lo agrego al equipo
        Then el usuario forma parte del equipo



