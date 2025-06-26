import { TreeNode } from '@/types';

export const treeData: TreeNode[] = [
  {
    phone: '+7(123)456-78-90',
    x: 0,
    y: -100,
    color: '#4caf50',
    children: [
      {
        phone: '+7(987)654-32-10',
        x: -100,
        y: -20,
        color: '#2196f3',
        children: [
          {
            phone: '+7(111)222-33-44',
            x: -150,
            y: 60,
            color: '#757575'
          }
        ]
      },
      {
        phone: '+7(555)123-45-67',
        x: 100,
        y: -20,
        color: '#2196f3'
      }
    ]
  }
];

export const drawNode = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string
) => {
  // Рисуем узел
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, 2 * Math.PI);
  ctx.fill();
  
  // Обводка
  ctx.strokeStyle = '#424242';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Текст
  ctx.fillStyle = 'white';
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text.substring(0, 12), x, y - 3);
  ctx.fillText(text.substring(12), x, y + 6);
};

export const drawConnections = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = '#757575';
  ctx.lineWidth = 2;
  
  // Связи от корня
  ctx.beginPath();
  ctx.moveTo(0, -75);
  ctx.lineTo(-100, 5);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(0, -75);
  ctx.lineTo(100, 5);
  ctx.stroke();
  
  // Связь к листу
  ctx.beginPath();
  ctx.moveTo(-100, 5);
  ctx.lineTo(-150, 35);
  ctx.stroke();
};