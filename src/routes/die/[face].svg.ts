import type { RequestHandler } from "@sveltejs/kit";

type Face = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function stringToFace(param: string): Face {
  const num = Number(param);
  if (0 <= num && num <= 6) {
    return num as Face;
  } else {
    throw new Error(`Invalid face ${param}`);
  }
}

export const get: RequestHandler = async ({ params }) => {
  const face = stringToFace(params.face);

  return {
    headers: {
      'Content-Type': 'image/svg+xml'
    },
    body: `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 38 38"
>
  <rect
    x="1"
    y="1"
    width="36"
    height="36"
    rx="5"
    ry="5"
    fill="white"
    stroke="currentColor"
    stroke-width="2"
  />
  ${face > 1 ? '<circle cx="8.5" cy="8.5" r="3.5" />' : ''}
  ${face >= 4 ? '<circle cx="29" cy="8.5" r="3.5" />' : ''}
  ${face >= 6 ? '<circle cx="8.5" cy="19" r="3.5" />' : ''}
  ${face === 1 || face === 3 || face === 5 ? '<circle cx="19" cy="19" r="3.5" />' : ''}
  ${face >= 6 ? '<circle cx="29" cy="19" r="3.5" />' : ''}
  ${face >= 4 ? '<circle cx="8.5" cy="29" r="3.5" />' : ''}
  ${face > 1 ? '<circle cx="29" cy="29" r="3.5" />' : ''}
</svg>`
  }
}
