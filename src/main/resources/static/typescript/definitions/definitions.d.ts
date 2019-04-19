
declare type MongoQuery = {
    field: PokemonFields,
    value: string | number
}

declare type Pokemon = {
    abilities :string[],
    against_bug :number,    
    against_dark :number,
    against_dragon :number,
    against_electric :number,
    against_fairy :number,
    against_fight :number,
    against_fire :number,
    against_flying :number,
    against_ghost :number,
    against_grass :number,
    against_ground :number,
    against_ice :number,
    against_normal :number,
    against_poison :number,
    against_psychic :number,
    against_rock :number,
    against_steel :number,
    against_water :number,
    base_egg_steps :number,
    base_total :number,
    base_happiness :number,    
    capture_rate :number,
    classfication :string,
    defense :number,
    experience_growth :number,
    height_m :number
    hp :number,
    japanese_name :string,
    name :string,
    percentage_male :number,
    pokedex_number :number,
    sp_attack :number,
    sp_defense :number,
    speed :number
    type1 :string,
    type2 :string,
    weight :number,
    generation :number,
    is_legendary :number,
    custom :boolean,
    pseudolegendary :boolean,
    images :string[]
}