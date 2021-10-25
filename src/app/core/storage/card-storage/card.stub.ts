import { CardEntity } from '../../models/card.model';

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export const CARD_DTO_STUB: CardEntity[] = [
  {
    id: 12,
    name: 'lol',
    create_time: '2021-10-12T20:04:01.498Z',
    satelliteState: { timestamp: 1635179297, iss_position: { latitude: '15.5297', longitude: '141.4921' }, message: 'success' },
  },
  {
    id: 15,
    name: 'lol1',
    create_time: '2021-10-12T20:04:01.498Z',
    satelliteState: { timestamp: 1635179297, iss_position: { latitude: '45.5297', longitude: '142.4921' }, message: 'success' },
  },
  {
    id: 67,
    name: 'lol2',
    create_time: '2021-10-12T20:04:01.498Z',
    satelliteState: { timestamp: 1635179297, iss_position: { latitude: '55.5297', longitude: '143.4921' }, message: 'success' },
  },
  {
    id: 69,
    name: 'lol3',
    create_time: '2021-10-12T20:04:01.498Z',
    satelliteState: { timestamp: 1635179297, iss_position: { latitude: '65.5297', longitude: '144.4921' }, message: 'success' },
  },
];
