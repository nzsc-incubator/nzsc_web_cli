#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

extern crate nzsc2p;
use nzsc2p::two_player_game::{
    NZSCTwoPlayerGame,
    WhichPlayer,
};

extern crate nzsc2p_json_interface;
use nzsc2p_json_interface::phase_as_json;

//use std::str;
//use std::str::FromStr;

fn string_to_which(s: &str) -> WhichPlayer {
    match s {
        "A" => WhichPlayer::PlayerA,
        "B" => WhichPlayer::PlayerB,
        _ => panic!("Illegal player!")
    }
}

#[wasm_bindgen]
pub struct NZSCTwoPlayerGameWebInterface {
    game: NZSCTwoPlayerGame,
}

#[wasm_bindgen]
impl NZSCTwoPlayerGameWebInterface {
    pub fn new() -> Self {
        Self {
            game: NZSCTwoPlayerGame::new()
        }
    }

    pub fn process_choice(&mut self, chooser: String, choice: String) {
        self.game.process_choice(string_to_which(&chooser[..]), choice);
    }

    pub fn get_phase(&self) -> String {
        phase_as_json(&self.game)
    }
}
