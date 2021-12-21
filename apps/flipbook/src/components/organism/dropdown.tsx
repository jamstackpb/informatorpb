
import { useEffect } from 'react';
import { StyleMenu } from '../../styles/styleMenu';

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
export const DropdownMenu: React.FC<PFlipBook> = ({ test }) => {
    useEffect(() => {
        let prev = '';
        test.map((t) => {
            t.dir.map((m) => {
                let pageText = document.createElement('li');
                if (prev !== m) {
                    let pageText1 = document.createElement('a');
                    pageText1.innerHTML = m[0].toUpperCase() + m.substring(1).replaceAll('_', ' ');
                    pageText.className = m;
                    pageText.appendChild(pageText1);
                    prev = m;
                }
                let i = 0;
                let pageText2 = document.createElement('ul');
                t.slug.map((s) => {
                    let pageText3 = document.createElement('li');
                    let pageText4 = document.createElement('a');
                    pageText4.innerHTML = s[0].toUpperCase() + s.substring(1).replaceAll('_', ' ');
                    pageText4.className = s;
                    pageText4.id = i.toString();
                    i++
                    pageText4.addEventListener('click', (e:any)=>{
                        const loc = document.getElementById('opis');
                        loc!.innerHTML = t.cleaned[e.target.id];
                        loc!.className = 'flex flex-row bg-pb p-2 mb-10';
                        t.changed.map((c: { name: string; equation: string }) => {
                        if (
                            c.name
                                .toLowerCase()
                                .replaceAll('ę', 'e')
                                .replaceAll('ż', 'z')
                                .replaceAll('ś', 's')
                                .replaceAll('ł', 'l') === s.toLowerCase().replaceAll('_', ' ')
                        ) {
                            document.getElementById('nazwa')!.innerHTML = c.name;
                            document.getElementById('wzor')!.innerHTML = c.equation;
                            document.getElementById('wynik')!.innerHTML = '0';
                        }
                        t.dir.map((m) => {
                            let hidden = document.getElementById('R');
                                hidden!.style.border = 'none';
                                hidden!.style.borderBottom = '2px solid #00610b';
                            if (m === 'architektury') {
                                hidden!.className = '';
                            } else {
                                hidden!.className = 'hidden';
                            }
                            });
                        });
                    })
                    pageText3.appendChild(pageText4);
                    pageText2.appendChild(pageText3);
                });
                let loc = document.querySelector('.kierunki');
                loc!.appendChild(pageText);
                loc = document.querySelector('.' + m);
                loc!.appendChild(pageText2);
            });
        });
    });
    return (
        <StyleMenu>
            <ul className="dropdown">
                <li>
                    <a href="#">Lista kierunków</a>
                    <ul className="kierunki">
                    
                    </ul>
                </li>
            </ul>
        </StyleMenu>
    );
};
