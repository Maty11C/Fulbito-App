Feature: Agregar jugador a equipo
    Como usuario
    Quiero agregar un participante a un equipo en un partido
    Para que participe del encuentro

    Scenario: Agregar correctamente un usuario a un equipo
        Given el usuario con id 1 registrado en el sistema
        When lo agrego al equipo con id 1
        Then el usuario con id 1 forma parte del equipo con id 1



