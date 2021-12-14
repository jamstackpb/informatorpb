import { useEffect } from "react";
import { DropdownMenu } from "./dropdown";
import { Wrapper, WrapperInput, WrapperText, Input, Button } from '../../styles/styleParser';
const Parser = (q: string, subjects: Array<{ symbol: string; result: number }>) => {
    let s = q;

    subjects.forEach((subject) => {
        s = s.replace(subject.symbol, subject.result.toString());
    });
    return eval(s);
};
interface PFlipBook {
    test: Array<{
        slug: string[];
        dir: string[];
        changed: {
            [key: string]: any;
        };
        cleaned: string[];
    }>;
}
export const HParser: React.FC<PFlipBook> = ({ test }) => {
    let inSubjects = [
        { symbol: 'FR', result: 0 }, //Fizyka roz. (input)
        { symbol: 'CR', result: 0 }, //Chemia roz. (input)
        { symbol: 'IR', result: 0 }, //Informatyka roz. (input)
        { symbol: 'BR', result: 0 }, //Biologia roz. (input)
    ];
    let array = [
        { symbol: 'MP', result: 0 }, //Matematyka podstawowa (input)
        { symbol: 'MR', result: 0 }, //Matematyka rozszerzona (input)
        { symbol: 'OP', result: 0 }, //Język obcy nowożytny podst. (input)
        { symbol: 'OR', result: 0 }, //Język obcy nowożytny roz. (input)
    ];
    useEffect(() => {
        const btn = document.getElementById('button');
        btn!.addEventListener('click', () => {
            const wzor = document.getElementById('wzor')!.innerHTML;
            for (let i = 0; i < array.length; i++) {
                const val = (document.getElementById(array[i].symbol) as HTMLInputElement)?.value;
                array[i].result = Number(val);
            }
            for (let i = 0; i < inSubjects.length; i++) {
                const val = (document.getElementById(inSubjects[i].symbol) as HTMLInputElement)?.value;
                inSubjects[i].result = Number(val);
            }
            const przedmiot = { fizyka: 1.75, cheminf: 1.5, biol: 1.25 };
            inSubjects.sort((a, b) => b.result - a.result);
            if (inSubjects[0].symbol === 'FR') {
                array.push({ symbol: 'WR', result: przedmiot.fizyka });
                array.push({ symbol: 'FR', result: inSubjects[0].result });
            } else if (inSubjects[0].symbol === 'CR' || inSubjects[0].symbol === 'IR') {
                array.push({ symbol: 'WR', result: przedmiot.cheminf });
                array.push({ symbol: 'FR', result: inSubjects[0].result });
            } else if (inSubjects[0].symbol === 'BR') {
                array.push({ symbol: 'WR', result: przedmiot.biol });
                array.push({ symbol: 'FR', result: inSubjects[0].result });
            } else return null;
            const val = (document.getElementById('R') as HTMLInputElement)?.value;
            array.push({ symbol: 'R', result: Number(val) });
            let ans = Parser(wzor, array); //suma punktów (output)
            if (ans === undefined) {
                alert('Wybierz kierunek na który chcesz przeliczyć punkty !!');
                ans = 'Brak wybranego kierunku !';
            }
            document.getElementById('wynik')!.innerHTML = ans;
            array.pop();
            array.pop();
            array.pop();
        });
        var inputs = document.getElementsByName('input');
        inputs.forEach(input => {
            input!.addEventListener('input', (e) => {
            if (Number((e.target as HTMLInputElement).value) < 0) {
                (e.target as HTMLInputElement).value = "0";
                alert('Minimalna liczba to 0')
            }
            if (Number((e.target as HTMLInputElement).value) > 100) {
                (e.target as HTMLInputElement).value = "100";
                alert('Maksymalna liczba to 100');
            }
        })
        });
    });
    return (
        <Wrapper>
            <DropdownMenu test={test}></DropdownMenu>
            <WrapperInput>
                <Input name="input" id="MP" placeholder="Wynik z podstawowej matematyki"></Input>
                <Input name="input" id="MR" placeholder="Wynik z rozszerzonej matematyki"></Input>
                <Input name="input" id="OP" placeholder="Wynik z język nowożytny podstawowy"></Input>
                <Input name="input" id="OR" placeholder="Wynik z język nowożytny rozszerzony"></Input>
                <Input name="input" id="FR" placeholder="Wynik z rozszerzonej fizyki"></Input>
                <Input name="input" id="CR" placeholder="Wynik z rozszerzonej chemii"></Input>
                <Input name="input" id="IR" placeholder="Wynik z rozszerzonej informatyki"></Input>
                <Input name="input" id="BR" placeholder="Wynik z rozszerzonej biologii"></Input>
                <Input name="input" id="R" className="hidden" placeholder="Wynik z egzaminu z rysunku"></Input>
                <Button id="button">Przelicz punkty</Button>
            </WrapperInput>

            <WrapperText>
                <div className="flex flex-row bg-pb p-2">
                    Wybrany kierunek:<div className="ml-1" id="nazwa"></div>
                </div>
                <div className="flex flex-row bg-pb p-2">
                    Wzór na wybrany kierunek: <div className="ml-1" id="wzor"></div>
                </div>
                <div className="flex flex-row bg-pb p-2">
                    Ilość uzyskanych punktów:<div className="ml-1" id="wynik"></div>
                </div>
                <div className="flex flex-row p-2" id="opis"></div>
            </WrapperText>
        </Wrapper>
    );
    
};
