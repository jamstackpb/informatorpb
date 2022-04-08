

import { getFieldsOfStudy } from "./fieldofstudy";
import { getFlipBook } from "./flipbookcontent";
import { Graduate } from "./graduate";
import { getScienceContent } from "./science";

export const numPages = () => {
const fos = getFieldsOfStudy().length
const content =getFlipBook().length
const graduate = Graduate().length
const scienceContent = getScienceContent().length

return fos + content+graduate+ scienceContent + 4

}