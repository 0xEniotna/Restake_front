'use client';

import Cyberpunk from '../../../public/cyberpunk.jpg';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Markets() {
  return (
    <>
      <div className="overflow-x-auto w-4/5 z-40">
        <div>
          <h1 className="text-8xl p-4 text-white">Markets</h1>
          <h2 className="text-4xl p-4 text-white">All available strategies</h2>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl text-white">
              <th>Name</th>
              <th>TVL</th>
              <th>Current Yield</th>
            </tr>
          </thead>
          <tbody className="text-3xl">
            {/* row 1 */}
            <tr>
              <td>EtherFi Juice</td>
              <td>163 ETH</td>
              <td>2.5 %</td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Kelp Juice</td>
              <td>134 ETH</td>
              <td>2.67 %</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Combo Juice</td>
              <td>260 ETH</td>
              <td>4 %</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
