import Joi from 'joi';

const playerIdCheck = Joi.number().required().messages({
  'number.base': 'player_id should be a number',
  'any.required': 'player_id is required',
});
const gameStatusCheck = Joi.number().required().valid(1, 2, 3, 4).messages({
  'number.base': 'Points should be a number',
  'any.required': 'Points is required',
  'any.only': 'Points must be 1, 2, 3, or 4',
});

const matchValidationScheme = {
  gameStatusCheck,
  playerIdCheck,
};

export default matchValidationScheme;
