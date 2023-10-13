import Joi from 'joi';

const playerIdValidation = Joi.number().required().messages({
  'number.base': 'player_id should be a number',
  'any.required': 'player_id is required',
});
const gameWinnerValidation = Joi.number().required().valid(0, 1, 2).messages({
  'number.base': 'game winner should be a number',
  'any.required': 'game winner is required',
  'any.only': 'game winner must be 0, 1, or 2',
});

const matchValidationScheme = {
  gameWinnerValidation,
  playerIdValidation,
};

export default matchValidationScheme;
