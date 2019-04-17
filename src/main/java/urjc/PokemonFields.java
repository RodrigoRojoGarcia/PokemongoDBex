package urjc;

public enum PokemonFields{
    abilities       ("abilities"),
    against_bug     ("against_bug"),
    against_dark    ("against_dark"),
    against_dragon  ("against_dragon"),
    against_electric("against_electric"),
    against_fairy   ("against_fairy"),
    against_fight   ("against_fight"),
    against_fire    ("against_fire"),
    against_flying  ("against_flying"),
    against_ghost   ("against_ghost"),
    against_grass   ("against_grass"),
    against_ground  ("against_ground"),
    against_ice     ("against_ice"),
    against_normal  ("against_normal"),
    against_poison  ("against_poison"),
    against_psychic ("against_psychic"),
    against_rock    ("against_rock"),
    against_steel   ("against_steel"),
    against_water   ("against_water"),
    base_egg_steps  ("base_egg_steps"),
    base_happiness  ("base_happiness"),
    base_total      ("base_total"),
    capture_rate    ("capture_rate"),
    classification  ("classfication"),
    defense         ("defense"),
    xp_growth       ("experience_growth"),
    height          ("height_m"),
    hp              ("hp"),
    japanese_name   ("japanese_name"),
    name            ("name"),
    percentage_male ("percentage_male"),
    pokedex_number  ("pokedex_number"),
    sp_attack       ("sp_attack"),
    sp_defense      ("sp_defense"),
    speed           ("speed"),
    type1           ("type1"),
    type2           ("type2"),
    weight          ("weight_kg"),
    generation      ("generation"),
    is_legendary    ("is_legendary");

    
    private String field;

    PokemonFields(final String field) {
        this.field = field;
    }

    public String toString() {
        return field;
    }
}