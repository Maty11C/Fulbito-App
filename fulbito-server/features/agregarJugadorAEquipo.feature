Feature: Agregar jugador a equipo
    Como usuario
    Quiero agregar un participante a un equipo en un partido
    Para que participe del encuentro

    Scenario: Agregar correctamente un usuario a un equipo
        Given un usuario registrado en el sistema
        When lo agrego al equipo
        Then el usuario forma parte del equipo
    
    Scenario: No agregar un usuario a un equipo si ya pertenece a otro en el mismo partido
        Given un usuario registrado en el sistema
        When lo agrego a un equipo y quiero agregarlo al otro
        Then el usuario no se agrega dos veces

    Scenario: No agregar al mismo usuario a un equipo si ya pertenece al mismo
        Given un usuario registrado en el sistema
        When lo agrego a un equipo y quiero agregarlo al mismo nuevamente
        Then el usuario no se agrega dos veces al mismo equipo

    Scenario: No agregar un usuario a un equipo si ya tiene 5 jugadores
        Given un usuario registrado en el sistema y un equipo completo
        When lo agrego al equipo
        Then el usuario no se agrega a un equipo completo



